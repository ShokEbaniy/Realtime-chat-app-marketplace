import React from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import { Image, X, Send } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);

  const fileInputRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Не удалось отправить сообщение");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Пожалуйста, загрузите изображение");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImagePreview}
            className="absolute -top-2 -right-2 bg-error text-error-content size-6 rounded-full flex items-center justify-center hover:bg-error/80 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="пиши сюда"
          className="input input-bordered flex-1 text-sm"
        />
        
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-circle btn-ghost"
          title="прикрепи фото"
        >
          <Image className="w-5 h-5" />
        </button>
        
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn btn-primary btn-circle"
          title="отправить"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
