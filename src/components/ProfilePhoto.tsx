import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";

interface ProfilePhotoSectionProps {
  formData: {
    firstName?: string;
    lastName?: string;
    profilePhotoUrl?: string;
    [key: string]: string | undefined;
  };
  setFormData: (data: { [key: string]: string | undefined }) => void;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  formData,
  setFormData,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(uploadError);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");


      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
          "mindbend_alumni_gallery"
      );


      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Update profile with new image URL
      const updateResponse = await fetch("/api/profile/update-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePhotoUrl: data.secure_url,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile");
      }

      // Update local state with new image
      setFormData({
        ...formData,
        profilePhotoUrl: data.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  return (
    <div className="border-b border-gray-100 pb-8">
      <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Profile Photo
      </h4>

      <div className="md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          {/* Profile Photo Display */}
          <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-white shadow-md transition-all duration-300 group-hover:shadow-lg">
            {formData.profilePhotoUrl ? (
              <Image
                src={formData.profilePhotoUrl}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 text-5xl font-bold">
                {formData.firstName?.[0] || ""}
                {formData.lastName?.[0] || ""}
              </div>
            )}

            {/* Upload Overlay */}
            <div
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (formData.profilePhotoUrl) {
                  setShowPhotoModal(true);
                } else {
                  triggerFileInput();
                }
              }}
            >
              <div className="text-white text-center p-2">
                {formData.profilePhotoUrl ? (
                  <>
                    <svg
                      className="w-8 h-8 mx-auto mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="text-xs font-medium">View Photo</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mx-auto mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <span className="text-xs font-medium">Add Photo</span>
                  </>
                )}
              </div>
            </div>

            {/* Hidden photo upload button - only show if photo already exists */}
            {formData.profilePhotoUrl && (
              <div
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            )}

            {/* Photo Modal - add this at the end of your component before the closing tag */}
            {showPhotoModal && formData.profilePhotoUrl && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                onClick={() => setShowPhotoModal(false)}
              >
                <div className="relative max-w-3xl max-h-[90vh] p-1 bg-white rounded-lg shadow-xl">
                  <button
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md border border-gray-200"
                    onClick={() => setShowPhotoModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden">
                    <Image
                      src={formData.profilePhotoUrl}
                      alt="Profile Photo"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />

          {/* Loading Indicator */}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default ProfilePhotoSection;
