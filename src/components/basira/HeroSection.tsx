import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-36 md:pt-32 pb-28 md:pb-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-32 left-16 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-primary-foreground/10 blur-2xl animate-pulse-soft" />
      </div>

      <div className="container relative z-10 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex max-w-[92%] sm:max-w-none items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs sm:text-sm font-medium mb-6 md:mb-7 backdrop-blur-sm border border-primary-foreground/20 shadow-lg leading-relaxed">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>مبادرة بَصيرة للدعم النفسي وتمكين الأطفال</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            نصنع <span className="text-accent">بصيرة</span> لأطفال
            <br />
            يستحقون المستقبل
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            نؤمن بأن كل طفل يحمل بداخله نورًا فريدًا. مهمتنا هي إضاءة الطريق من
            خلال الدعم النفسي والتعليمي والأنشطة الملهمة.
          </motion.p>

          {/* دعم المؤسسة */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-md shadow-lg w-full max-w-[320px] sm:max-w-fit">
              <span className="text-primary-foreground text-sm md:text-base font-medium">
                بدعم من مؤسسة
              </span>

              <div className="hidden sm:block h-8 w-px bg-primary-foreground/20" />

              <img
                src="/partners/pssf.png"
                alt="PSSF"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Button
  variant="hero"
  size="lg"
  className="text-base px-8 py-6 rounded-xl gap-2 w-full sm:w-auto"
  onClick={() =>
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeKIoBvhLFCMO7Kr4bDpx-jWTOinkogAcII9izUTwQ6whQFVQ/viewform?usp=dialog",
      "_blank"
    )
  }
>
  <Heart className="h-5 w-5" />
  انضم إلينا
</Button>

<Button
  variant="hero-outline"
  size="lg"
  className="text-base px-8 py-6 rounded-xl gap-2 w-full sm:w-auto"
  onClick={() =>
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLScV-PSwmKQrw2di1KtBFLjHXewJz7aF5WPX4nOQiXjFFU0m7w/viewform?usp=sharing&ouid=108016718349544175707",
      "_blank"
    )
  }
>
  <Users className="h-5 w-5" />
  تطوّع معنا
</Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 46C96 42 192 36 288 36C384 36 480 42 576 46C672 50 768 50 864 46C960 42 1056 36 1152 36C1248 36 1344 42 1392 46L1440 50V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}