import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";

export function AccountMenu() {
return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 select-none">
                pizza shop
                <ChevronDown className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
                <span> Diogo Alves </span>
                <span className="text-xs font-normal text-muted-foreground">
                    diogoalvesnogueira@gmail.com
                    </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <Building className="w-4 h-4 mr-2"/>
                <span> Perfil da loja</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                <LogOut className="w-4 h-4 mr-2"/>
                <span>sair</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)

}