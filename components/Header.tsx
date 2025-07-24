'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para obtener la ruta
import { useState } from "react"; // Hook para manejar el estado
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { BookOpen, Code2, Laptop, Menu } from "lucide-react";
import { cn } from "@/lib/utils"; // Funciona para combinar clases de CSS
import { Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

// Elementos de navegacion con etiquetas, rutas y icons

const navItems 

