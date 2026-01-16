import evisaWebsites from "@/data/evisa.json";
import toursWebsites from "@/data/tours.json";
import servicesWebsites from "@/data/services.json";
import { cn } from "@/lib/utils";
import { filteredTags } from "@/store";
import { useStore } from "@nanostores/react";
import { X } from "lucide-react";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { tagColors } from "@/lib/colors";

/*export default function ListTags() {
  const selectedTags: string[] = useStore(filteredTags);

  const tags = useMemo(() => {
    const tags = new Set<string>();
    evisaWebsites.forEach((website) => {
      website.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <div
      className={cn(
        "container mx-auto p-4 md:px-0 md:py-8",
        "flex flex-wrap items-center justify-center gap-1",
      )}
    >
      {tags.map((tag) => {
        const selected = selectedTags.includes(tag);
        return (
          <Button
            key={tag}
            size="sm"
            variant={selected ? "default" : "outline"}
            onClick={() =>
              filteredTags.set(
                selected
                  ? selectedTags.filter((e) => e !== tag)
                  : [...selectedTags, tag],
              )
            }
            className={cn(
              "flex cursor-pointer items-center gap-2 transition-all",
            )}
          >
            {tag} {selected && <X size={12} />}
          </Button>
        );
      })}
    </div>
  );
}*/

export default function ListTags() {
  const selectedTags: string[] = useStore(filteredTags);

  const tags = useMemo(() => {
    const tagsSet = new Set<string>();
    evisaWebsites.forEach((website) => {
      website.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <div
      className={cn(
        "container mx-auto p-4 md:px-0 md:py-8",
        "flex flex-wrap items-center justify-center gap-2",
      )}
    >
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);

        // Lấy class màu dựa trên tên tag
        const colorClass = tagColors[tag.toLowerCase()] || tagColors['defaultColor'];

        return (
          <Button
            key={tag}
            size="sm"
            // Khi được chọn, ta dùng class mặc định của Shadcn hoặc giữ nguyên màu nhưng đậm hơn
            // Ở đây mình dùng logic: nếu chọn thì hiện màu đậm, chưa chọn hiện màu theo mapping
            variant={isSelected ? "default" : "outline"}
            onClick={() =>
              filteredTags.set(
                isSelected
                  ? selectedTags.filter((e) => e !== tag)
                  : [...selectedTags, tag],
              )
            }
            className={cn(
              "flex cursor-pointer items-center gap-2 transition-all border",
              !isSelected && colorClass, // Chỉ áp dụng màu đặc biệt khi CHƯA chọn
              isSelected && "ring-2 ring-offset-1 ring-primary" // Highlight khi đã chọn
            )}
          >
            {tag} {isSelected && <X size={12} />}
          </Button>
        );
      })}
    </div>
  );
}
