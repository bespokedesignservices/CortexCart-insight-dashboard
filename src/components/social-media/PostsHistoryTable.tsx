
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Activity, MousePointerClick, Star } from "lucide-react";
import { PostItem, SocialPlatform } from "@/types/social-media";

interface PostsHistoryTableProps {
  posts: PostItem[];
  socialPlatforms: SocialPlatform[];
}

export const PostsHistoryTable: React.FC<PostsHistoryTableProps> = ({ posts, socialPlatforms }) => {
  const getPlatformColor = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform?.color || "bg-gray-500";
  };

  const getPlatformName = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform?.name || platformId;
  };

  const getEffectivenessLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    if (score >= 20) return "Poor";
    return "Very Poor";
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-green-400";
    if (score >= 40) return "bg-yellow-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span>Engagement</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <MousePointerClick className="h-4 w-4" />
                  <span>Clicks</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Effectiveness</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No posts created yet. Create your first post above.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-[240px]">
                    <div className="flex items-center gap-3">
                      {post.imageUrl && (
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={post.imageUrl} 
                            alt="Post image" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-sm font-medium truncate">{post.content}</p>
                        {post.linkUrl && (
                          <p className="text-xs text-muted-foreground truncate">{post.linkUrl}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPlatformColor(post.platform)}`}>
                      {getPlatformName(post.platform)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatDate(post.createdAt)}</TableCell>
                  <TableCell className="text-sm">{post.stats.engagement.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{post.stats.clicks.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={`${getEffectivenessColor(post.stats.effectiveness)}`}>
                      {post.stats.effectiveness}% - {getEffectivenessLabel(post.stats.effectiveness)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {posts.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
