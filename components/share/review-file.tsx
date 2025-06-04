"use client";

import { ReactElement, useEffect, useState } from "react";
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import { User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  file?: File;
  trigger: ReactElement;
}

export default function ReviewFile({ file, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [docs, setDocs] = useState<IDocument[]>([]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      console.log("filre", file)
      reader.onload = (event) => {
        const base64 = event.target?.result as string;

        setDocs([
          {
            uri: base64,
            fileName: file.name,
            fileType: "xlsx",
          },
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      setDocs([]);
    }
  }, [file]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Xem tài liệu
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)]">
          <div className="space-y-6">
            {docs.length > 0 ? (
              <DocViewer
                documents={[{uri:"http://localhost:8080/appointment/hdsd.docx",fileType: "docx", }]}
                pluginRenderers={DocViewerRenderers}
                style={{ height: "80vh" }}
              />
            ) : (
              <p className="text-sm text-gray-500 italic">Không có file để hiển thị.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
