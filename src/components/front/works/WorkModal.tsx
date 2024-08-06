import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

type WorkModalProps = {
  url: string;
  setSelectedImage: () => void;
};

export const WorkModal = ({ url, setSelectedImage }: WorkModalProps) => {
  return (
    <Dialog open={!!url} onOpenChange={() => setSelectedImage()}>
      <DialogContent>
        <DialogTitle className="hidden">画像を拡大</DialogTitle>
        <div className="relative w-full min-h-screen">
          <Image
            src={url}
            fill
            objectFit="cover"
            objectPosition="top"
            alt={`Selected Photo`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
