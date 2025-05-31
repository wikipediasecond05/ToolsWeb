import { categories, tools } from "@/lib/toolsData"
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({toolId}: {toolId: string}) {
    const toolData = tools.find(tool => tool.id === toolId);
    const categoryId = toolData?.category;
    const categoryData = categories.find(category => category.id === categoryId);

    const breadcrumbs = [
        {
            name: <span className="inline-block"><Home className="w-4 h-4 inline-flex self-center" /></span>,
            href: "/",
        },
        {
            name: categoryData?.name,
            href: `/categories/${categoryId}`,
        },
        {
            name: toolData?.title,
            href: `/tools/${toolId}`,
        },
    ]

    return (
        <div className="flex whitespace-nowrap overflow-x-hidden items-center max-w-full">
            {
                breadcrumbs.map((breadcrumb, index) => (
                    <span key={index} className={cn("text-muted-foreground min-w-max", index === breadcrumbs.length - 1 && "min-w-0 overflow-hidden whitespace-nowrap text-ellipsis")}>
                        <Link className="hover:text-primary transition-colors" href={breadcrumb.href}>{breadcrumb.name}</Link>
                        {index < breadcrumbs.length - 1 && <>
                            <ChevronRight className="h-4 w-4 inline-block mx-1" />
                        </>}
                    </span>
                ))
            }
        </div>
    )
}