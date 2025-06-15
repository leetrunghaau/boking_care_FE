
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { getFullURL } from '@/helper/url';
import { downloadFile } from '@/helper/my-file';

interface Pops{
  isOpen: boolean
  setOpen: (val: boolean) => void
  uri: string | null
  name?: string 
}

export function ImgDialogView({ isOpen, setOpen, uri, name = "Xem ảnh" }: Pops) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-teal-600">{name}</DialogTitle>
        </DialogHeader>

        <div className="relative flex-1 p-6">
          <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={getFullURL(uri)}
              alt={name || "image"}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              {/* <p className="font-medium">{selectedImage.name}</p> */}
              {/* <p className="text-xs text-gray-500">{selectedImage.type}</p> */}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-teal-200 text-teal-600 hover:bg-teal-50 flex items-center gap-2"
                 onClick={() => downloadFile(getFullURL(uri))}
              >
                <span>
                  <Download className="h-4 w-4" />
                  Tải về
                </span>
              </Button>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
