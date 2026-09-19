// DUDI CRM — lưu liên hệ về MongoDB Cloud dùng chung cho 8 landing page + trang quản lý.
// Cách dùng: điền MONGODB_URI (+ MONGODB_DB, mặc định dudi_crm) vào file .env.local
// rồi gọi saveContactToCrm({ source: "landing1", fullName, phone, ... }).
// Hàm này KHÔNG BAO GIỜ ném lỗi — nếu chưa cấu hình DB hoặc mất mạng,
// nó chỉ ghi log và trả về { saved: false } để form vẫn báo thành công cho khách.
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "dudi_crm";

let cachedClient = globalThis.__dudiCrmClient || null;
let connectPromise = globalThis.__dudiCrmConnect || null;
let indexesEnsured = globalThis.__dudiCrmIndexesEnsured || false;

function getClient() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      maxPoolSize: 5,
      // Fail nhanh thay vì treo hàng chục giây khi DB unreachable
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
    globalThis.__dudiCrmClient = cachedClient;
  }
  return cachedClient;
}

async function getCollection() {
  if (!connectPromise) {
    connectPromise = getClient().connect();
    globalThis.__dudiCrmConnect = connectPromise;
  }
  await connectPromise;
  const col = getClient().db(dbName).collection("contacts");
  if (!indexesEnsured) {
    indexesEnsured = true;
    globalThis.__dudiCrmIndexesEnsured = true;
    // Index đã có từ lần chạy đầu — tạo nền, KHÔNG chặn request gửi form
    col.createIndex({ source: 1, createdAt: -1 }).catch(() => {});
  }
  return col;
}

export async function saveContactToCrm(doc) {
  if (!uri) return { saved: false, reason: "missing-uri" };
  try {
    const col = await getCollection();
    const now = new Date().toISOString();
    const result = await col.insertOne({
      status: "pending",
      createdAt: now,
      updatedAt: now,
      ...doc,
      updatedAt: now,
    });
    return { saved: true, id: String(result.insertedId) };
  } catch (err) {
    // Cho phép lần gọi sau thử kết nối lại từ đầu thay vì kẹt promise lỗi
    connectPromise = null;
    globalThis.__dudiCrmConnect = null;
    console.error("[DUDI CRM] Không lưu được về MongoDB:", err && err.message);
    return { saved: false, reason: "error" };
  }
}
