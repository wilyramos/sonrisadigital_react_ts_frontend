import { Calendar, Home, Users, ListChecks, DollarSign, FileText, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>General</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="home">
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard">
                                        <Home />
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key="calendario">
                                <SidebarMenuButton asChild>
                                    <Link to="/calendario">
                                        <Calendar />
                                        <span>Calendario</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Pacientes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="pacientes">
                                <SidebarMenuButton asChild>
                                    <Link to="/pacientes">
                                        <Users />
                                        <span>Pacientes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>                            
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Citas y Servicios</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="lista-citas">
                                <SidebarMenuButton asChild>
                                    <Link to="/citas">
                                        <ListChecks />
                                        <span>Lista de Citas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            
                            <SidebarMenuItem key="servicios">
                                <SidebarMenuButton asChild>
                                    <Link to="#">
                                        <DollarSign />
                                        <span>Servicios</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Informes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="reportes">
                                <SidebarMenuButton asChild>
                                    <Link to="/reportes">
                                        <FileText />
                                        <span>Reportes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Configuración</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="settings">
                                <SidebarMenuButton asChild>
                                    <Link to="/settings">
                                        <Settings />
                                        <span>Configuración</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <SidebarMenu>
                    <SidebarMenuItem key="logout">
                        <SidebarMenuButton asChild>
                            <Link to="/logout">
                                <Settings />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            
        </Sidebar>
    );
}