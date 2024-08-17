import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return(
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-yellow-600 text-xs " +
                        (link.active ? "bg-red-950 " : " ") +
                        (!link.url ? "!text-yellow-600 cursor-now-allowed " : "hover:bg-red-950")
                    }
                    dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    );
}
