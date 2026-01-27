import React from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import { Image, X } from "lucide-react";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);

  const ref = React.useRef(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (ref.current) {
        ref.current.value = null;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
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
    if (ref.current) {
      ref.current.value = null;
    }
  };

  return (
    <div className="relative ">
      {imagePreview && (
        <div className="flex  fixed bottom-32 w-full p-4 border-t border-gray-700 bg-gray-900 ">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-36 h-36 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImagePreview}
            className="fixed left-36 bottom-72 bg-gray-700 text-white size-12 rounded-full p-1 hover:bg-gray-600"
          >
            <X className="size-10" />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex fixed bottom-20 bg-hidden left-0 right-0 items-center p-2 border-t bg-gray-900 border-gray-700 "
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          ref={ref}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="ml-2 mr-2 bg-gray-700 text-white rounded-full px-4 py-2 hover:bg-gray-600"
        >
          <Image className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="flex items-center ml-2 mr-10 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
