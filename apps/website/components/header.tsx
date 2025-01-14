"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import { Logo } from "@workspace/ui/components/logo";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Menu } from "lucide-react";
import { FadeFromTop } from "@/motions/fade";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3002" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 z-50 mx-auto max-w-[800px] transition-all duration-500 ${isScrolled ? "top-4" : "top-2"
      }`}>

      <div className={`transition-all duration-500 p-2 border rounded-md ${isScrolled ? "bg-background/30 backdrop-blur-lg border-primary/30 mx-4" : "bg-transparent border-transparent"
        }`}>

        <div className="flex items-center justify-between">
          <Link href="/" className="ml-2">
            <FadeFromTop delay={0.2} duration={0.4}>
              <Logo />
            </FadeFromTop>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <FadeFromTop delay={0.2} duration={0.4}>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </FadeFromTop>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <FadeFromTop delay={0.2} duration={0.4}>
              <ThemeToggle />
            </FadeFromTop>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <FadeFromTop delay={0.2} duration={0.4}>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 flex flex-col gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </FadeFromTop>
            </div>

            {/* Sign In Button */}
            <FadeFromTop delay={0.2} duration={0.4}>
              <Button asChild>
                <Link href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}>
                  Sign in
                </Link>
              </Button>
            </FadeFromTop>
          </div>
        </div>
      </div>

    </header >
  );
}

