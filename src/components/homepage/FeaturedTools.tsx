
'use client';

import { categories } from "@/lib/toolsData";
import { IconName, Icons } from "../icons";
import Link from "next/link";


export function FeaturedTools() {
    return (
        <div className="px-4 w-full bg-gradient-to-r dark:from-background/40 dark:via-primary/5 dark:to-background/40 from-white/40 via-primary/5 to-white/40 mt-16 py-6">
            <h2 className="text-center mb-8 text-[17px]">Featured Categories: </h2>
            <div className="w-full flex-wrap justify-center flex my-5 gap-4">
                {
                    categories.slice(0, 6).map((category) => {
                        const IconComponent = Icons[category.iconName as IconName];
                        return (
                        <Link
                            href={`/categories/${category.id}`}
                            className="px-3 py-2 cursor-pointer bg-white dark:border-gray-700 border-gray-200 dark:bg-background rounded-lg border flex items-center gap-2"
                            key={category.id}
                        >
                            {IconComponent && <IconComponent className="h-4 w-4 text-primary" />}
                            <span className="text-sm">{category.name}</span>
                        </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}
