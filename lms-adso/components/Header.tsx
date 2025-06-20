"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; //hook para obtener la ruta actual
import { useState } from "react"; //hook para manjear el estado
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { DarkModeToggle } from "./DarkModeToggle";
import { BookOpen, Code2, Laptop, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils"; // Utilidad para combinar clases CSS
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sign } from "crypto";

//Elementos del menu lateral y los iconos

const navItems = [
  {label: "Cursos", href:"/cursos", icon: BookOpen},
  {label: "Retos", href:"/retos", icon: Code2},
  {label: "Proyectos", href:"/proyectos", icon: Laptop},
]

export default function Header() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú lateral
  return (
    <header className="sticy top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* Contenedor principa; */}
    <div className="container flex h-16 items-center justify-between">
      {/* Logo y navegacion*/}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold sm:block hidden">Academia ADSO</span>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">BETA</span>
          </Link>

          {/* Navegacion */}
          <nav className="hidden sm:flex items-center gap-4 ml-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80", pathname === item.href ?"text-foreground" : "text-foreground/60")}>
                <item.icon className="h-4 w-4"/>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">{item.label}</span>
              </Link>
            ))}
          </nav>
      </div>
      {/* Botones de usuario y modo oscuro */}
      <div>
        <DarkModeToggle />
        {/* Boton de inicio de sesion */}
        <SignedIn>
          <UserButton/>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" className="ml-4">
              Iniciar Sesión
            </Button>
          </SignInButton>
        </SignedOut>

        {/* Navegacion movil */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="sm:hidden ml-4">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80", pathname === item.href ?"text-foreground" : "text-foreground/60")}>
                  <item.icon className="h-4 w-4"/>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent> 
        </Sheet>
      </div>
    </div>
  </header>
  )
}