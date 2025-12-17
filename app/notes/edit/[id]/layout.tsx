import { blogs } from "@/data/blogs";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.slug,
  }));
}

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
