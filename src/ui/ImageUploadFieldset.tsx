import { MdAddPhotoAlternate } from "react-icons/md";

type ImageUploadFieldsetProps = {
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string;
  label?: string;
};

export default function ImageUploadFieldset({
  file,
  onChange,
  previewUrl,
  label = "Upload Photo",
}: ImageUploadFieldsetProps) {
  const imageSrc = file ? URL.createObjectURL(file) : previewUrl;

  return (
    <fieldset className="mb-4">
      <legend className="text-slate-700 text-sm font-medium mb-2">
        {label}
      </legend>

      <div className="flex flex-col items-start gap-2">
        <label className="flex flex-col items-center justify-center p-4 cursor-pointer bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
          <span className="flex flex-col items-center gap-1 text-blue-500">
            <MdAddPhotoAlternate size={50} />
            <span className="text-lg font-medium">Choose Photo</span>
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>

        <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF</p>
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          className="w-full max-h-[400px] object-cover rounded-md mt-3"
        />
      )}
    </fieldset>
  );
}
