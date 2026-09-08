import {
  Zap,
  Palette,
  Search,
  ShieldCheck,
  BarChart3,
  Headphones,
} from "lucide-react";
import { featuresData } from "@/constants/landing-data";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Map icon string names to components
const iconMap = {
  Zap: Zap,
  Palette: Palette,
  Search: Search,
  ShieldCheck: ShieldCheck,
  BarChart3: BarChart3,
  Headphones: Headphones,
};

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <Container>
        <SectionHeading
          title="Mọi Công Cụ Cần Thiết Để Chinh Phục Khách Hàng"
          description="Được kiến trúc tỉ mỉ từ mã nguồn đến giao diện người dùng, giúp bạn tập trung hoàn toàn vào tăng trưởng doanh thu."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Zap;

            return (
              <Card key={feature.id} className="relative overflow-hidden group">
                {/* Subtle gradient hover layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {feature.badge && (
                      <Badge variant="default">{feature.badge}</Badge>
                    )}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="pt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
