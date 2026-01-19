import { Badge } from "@/components/ui/badge";
import evisaWebsites from "@/data/evisa.json";
import toursWebsites from "@/data/tours.json";
import servicesWebsites from "@/data/services.json";
import { cn } from "@/lib/utils";
import { filteredTags, searchKeyword } from "@/store";
import { useStore } from "@nanostores/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { tagColors } from "@/lib/colors";
import { Copy, Check } from "lucide-react";

export default function ListWebsites() {
  const search = useStore(searchKeyword);
  const tags = useStore(filteredTags);
  const isInitialMount = useRef(true);

  const [copiedText, setCopiedText] = useState<{type: 'url' | 'desc', id: string} | null>(null);

  // Hàm xử lý copy chung
  const handleCopy = async (e: React.MouseEvent, text: string, id: string, type: 'url' | 'desc') => {
    e.preventDefault();
    e.stopPropagation();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText({ type, id });
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Lỗi khi copy:", err);
    }
  };

  // 1. Lấy tag từ URL khi lần đầu load trang (Mount)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tagFromUrl = queryParams.get("tag");

    if (tagFromUrl && tags.length === 0) {
      // Nếu có tag trên URL, cập nhật vào store
      filteredTags.set([tagFromUrl]);
    }
  }, []);

  // 2. Theo dõi thay đổi của store `tags` để cập nhật URL (Update/Delete)
  useEffect(() => {
    // Bỏ qua lần chạy đầu tiên để không ghi đè URL khi vừa mới đọc xong
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const url = new URL(window.location.href);

    if (tags.length > 0) {
      // Nếu có tag được chọn, cập nhật ?tag=...
      // Ở đây lấy tag đầu tiên (hoặc join nếu bạn dùng nhiều tag: tags.join(','))
      url.searchParams.set("tag", tags[0]);
    } else {
      // Nếu mảng tags trống (người dùng bỏ chọn), xóa param 'tag'
      url.searchParams.delete("tag");
    }

    // Cập nhật URL trên thanh địa chỉ mà không reload trang
    window.history.replaceState({}, "", url);
  }, [tags]); // Chạy mỗi khi mảng tags trong store thay đổi

  const filteredWebsites = useMemo(() => {
    if (!search && tags.length === 0) return toursWebsites;
    return toursWebsites.filter((website) => {
      if (
        tags.length > 0 &&
        !tags.every((tag) => (website.tags as string[]).includes(tag))
      ) {
        return false;
      }
      if (!website.title.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [search, tags]);

  return (
    <div
      className={cn(
        "container mx-auto px-4 md:px-0",
        "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4",
      )}
    >
      {filteredWebsites.map((website) => (
        <a
          key={website.url}
          className={cn(
            "rounded bg-background p-4 shadow",
            "flex flex-col gap-4",
          )}
          href={website.url}
          target="_blank"
        >
          <div className="flex gap-2">
            <div className="h-12 w-12 bg-muted p-2">
              <img
                src={
                  website.favicon ||
                  "https://ps.w.org/replace-broken-images/assets/icon-256x256.png?rev=2561727"
                }
                alt={website.title}
                className="w-full rounded object-cover"
              />
            </div>
            <p className="flex-1 text-sm font-semibold">{website.title}</p>
            {/* Nút copy URL ở góc tiêu đề */}
            <button
              onClick={(e) => handleCopy(e, website.url, website.url, 'url')}
              className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-all"
              title="Copy URL"
            >
              {copiedText?.id === website.url && copiedText.type === 'url' ? <Check /> : <Copy />}
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              {/* Description + Copy Description */}
              <div className="relative group/desc text-xs text-muted-foreground">
                <p className="line-clamp-3 leading-relaxed">
                  {website.description ?? website.title}
                </p>
                <button
                  onClick={(e) => handleCopy(e, website.description ?? website.title, website.url + '-desc', 'desc')}
                  className="absolute -right-1 -bottom-1 p-1 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:text-primary transition-all rounded"
                  title="Copy Description"
                >
                  {copiedText?.id === (website.url + '-desc') ? <Check /> : <Copy />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {website.tags.map((tag) => (
                  <Badge className="px-1 py-0">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">
                Last reviewed at{" "}
                <span className="font-medium">{website.lastReviewAt}</span>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
