'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para obtener la ruta
import { useState } from "react"; // Hook para manejar el estado
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Badge, BookOpen, Code2, Laptop, Menu } from "lucide-react";
import { cn } from "@/lib/utils"; // Funciona para combinar clases de CSS
import { Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import { SearchInput } from "@/components/Searchinput"; // Importar el componente de búsqueda

// Elementos de navegacion con etiquetas, rutas y icons

const navItems = [
    { label: "Cursos", href: "/cursos", icon: BookOpen },
    { label: "Retos", href: "/retos", icon: Code2, Badge: "Muy pronto" },
    { label: "Proyectos", href: "/projectos", icon: Laptop },
]



export default function Header() {
    const pathname = usePathname(); // Obtener la ruta actual
    const [isOpen, setIsOpen] = useState(false); // Estado para manejar
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            {/* Contenedor principal */}
            <div className="container flex h-16 items-center justify-between">
                {/* Logo y navegacion */}
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                            <Code2 className="h-5 w-5"/>
                        </div>
                        <span className="text-xl font bold sm:block hidden">
                            Academia ADSO
                        </span>
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs">BETA</span>
                    </Link>

                    {/* Navegacion principal */}
                    <nav className="hidden sm:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                                {item.Badge && (
                                    <Badge className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{item.Badge}</Badge>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
                {/* Control para el modo oscuro */}
                <div className="flex items-center gap-4">
                    {/* Barra de busqueda */}
                    <SearchInput />

                    {/* Boton de modo oscuro */}
                    <DarkModeToggle />
                    {/* Boton de inicio de sesion */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="outline" className="hidden md:inline-flex">
                                Iniciar Sesión
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    {/* Nevegacion movil */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir Menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <nav className="flex flex-col gap-4 p-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80",
                                            pathname === item.href ? "text-foreground" : "text-foreground/60"
                                        )}
                                        onClick={() => setIsOpen(false)} // Cerrar el menu al hacer click
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                        {item.Badge && (
                                            <Badge className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{item.Badge}</Badge>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                            {/* Boton de inicio de sesion en el menu movil */}
                            <SignedIn>
                                <UserButton />
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button variant="outline" className="w-full">
                                        Iniciar Sesión
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

