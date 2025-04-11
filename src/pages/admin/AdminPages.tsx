
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminPages: React.FC = () => {
  // Sample pages data
  const pages = [
    { id: 1, title: "Home", slug: "home", status: "Published", lastModified: "2025-04-10" },
    { id: 2, title: "About Us", slug: "about-us", status: "Published", lastModified: "2025-04-08" },
    { id: 3, title: "Services", slug: "services", status: "Draft", lastModified: "2025-04-05" },
    { id: 4, title: "Contact", slug: "contact", status: "Published", lastModified: "2025-04-01" },
    { id: 5, title: "Blog", slug: "blog", status: "Published", lastModified: "2025-03-28" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Pages</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Page
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Pages</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search pages..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-sm">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">Slug</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">Last Modified</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-b">
                    <td className="px-4 py-3">{page.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{page.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        page.status === "Published" 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{page.lastModified}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;
