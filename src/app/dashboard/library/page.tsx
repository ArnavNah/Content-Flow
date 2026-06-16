"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, Download, Trash2, Edit3, Eye } from "lucide-react";

// Generate 50 mock items
const generateMockData = () => {
  const platforms = ["LinkedIn", "Twitter", "Newsletter", "Video Script"];
  const statuses = ["Published", "Draft", "Scheduled", "Archived"];
  const categories = ["Growth", "Marketing", "Product", "Engineering", "Design"];
  
  return Array.from({ length: 50 }).map((_, i) => {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const views = Math.floor(Math.random() * 50000);
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `item-${i}`,
      title: `${category} Tips: Vol ${i + 1}`,
      platform,
      status,
      category,
      views,
      date: date.toLocaleDateString(),
    };
  });
};

const mockData = generateMockData();

export default function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
          <p className="text-muted-foreground mt-1">Manage, filter, and export your generated assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button>New Content</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title or platform..." 
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {filteredData.length} items</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center"><Checkbox /></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(0, 10).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center"><Checkbox /></TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.platform}</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === "Published" ? "default" :
                      item.status === "Draft" ? "secondary" :
                      item.status === "Scheduled" ? "outline" : "destructive"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted/50">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {item.views > 0 ? item.views.toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div>Selected 0 items</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
