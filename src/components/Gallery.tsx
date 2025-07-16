import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import GradientCard from "./GradientCard";
import GradientModal from "./GradientModal";
import type { Gradient } from "../types/gradient";
import Carosal from "./Carosal";

// Local gradients using images from public folder
const localGradients: Gradient[] = [
  {
    _id: "local-1",
    public_id: "local-1",
    name: "ChatGPT Image 1",
    url: "/ChatGPT Image Jul 13, 2025, 12_44_18 PM.png",
    imageUrl: "/ChatGPT Image Jul 13, 2025, 12_44_18 PM.png",
    created_at: "2025-07-13T00:00:00Z",
  },
  {
    _id: "local-2",
    public_id: "local-2",
    name: "ChatGPT Image 2",
    url: "/ChatGPT Image Jul 13, 2025, 01_04_10 PM.png",
    imageUrl: "/ChatGPT Image Jul 13, 2025, 01_04_10 PM.png",
    created_at: "2025-07-13T00:00:00Z",
  },
  {
    _id: "local-4",
    public_id: "local-4",
    name: "ChatGPT Image 4",
    url: "/ChatGPT Image Jul 13, 2025, 01_31_28 PM.png",
    imageUrl: "/ChatGPT Image Jul 13, 2025, 01_31_28 PM.png",
    created_at: "2025-07-13T00:00:00Z",
  },
  {
    _id: "local-5",
    public_id: "local-5",
    name: "Milad Fakurian",
    url: "/milad-fakurian-nY14Fs8pxT8-unsplash.jpg",
    imageUrl: "/milad-fakurian-nY14Fs8pxT8-unsplash.jpg",
    created_at: "2025-07-13T00:00:00Z",
  },
];

export default function Gallery() {
  const { user } = useUser();
  const [gradients, setGradients] = useState<Gradient[]>([]);
  // const [error, setError] = useState(''); // Removed as it's not displayed in UI
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(
    null
  );

  useEffect(() => {
    // Only fetch gradients if user is authenticated
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get("/api/gradients")
      .then((res) => {
        setGradients(res.data.gradients);
        setLoading(false);
      })
      .catch((error) => {
        // Check if it's an authentication error
        if (error.response?.status === 401) {
          // setError('Please sign in to access gradients');
        } else {
          // setError('Failed to load gradients');
        }
        setLoading(false);
      });
  }, [user]);

  const handleDownload = async (id: string) => {
    try {
      // Try to find the gradient in both remote and local arrays using both _id and public_id
      let gradient = gradients.find((g) => g._id === id || g.public_id === id);
      if (!gradient) {
        gradient = localGradients.find(
          (g) => g._id === id || g.public_id === id
        );
      }
      if (!gradient) throw new Error("Gradient not found");
      const imageUrl = gradient.imageUrl || gradient.url;
      if (!imageUrl) throw new Error("Image URL not found");
      const safeName = gradient.name
        ? gradient.name
        : gradient.public_id
          ? gradient.public_id
          : "gradient";
      const fileName = `${safeName.replace(/[^a-zA-Z0-9]/g, "_")}.png`;

      // If the image is a local file (starts with /), download directly
      if (imageUrl.startsWith("/")) {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // For remote images, use the API route
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) {
        const text = await response.text();
        // setError(`Download failed: ${text}`);
        // setTimeout(() => setError(''), 3000);
        console.error(`Download failed: ${text}`);
        return;
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // setError('Download failed.');
      // setTimeout(() => setError(''), 3000);
      console.error("Download failed.");
    }
  };

  const openModal = (gradient: Gradient) => setSelectedGradient(gradient);
  const closeModal = () => setSelectedGradient(null);

  const filteredGradients = gradients.filter((g) => {
    const name = g.name || g.public_id || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Helper to get the correct id for a gradient (local or remote)
  function getGradientId(gradient: Gradient) {
    return gradient._id || gradient.public_id || "";
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <Carosal gradients={localGradients} />

        {/* Search Bar Section */}
        {user && (
          <div className="mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 md:mb-10">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search gradients..."
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 border border-white/20 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A2D5C6] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-400 text-lg font-medium">
              Loading gradients...
            </p>
          </div>
        ) : filteredGradients.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              {!user ? (
                // Show login prompt when user is not authenticated
                <div>
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-10 h-10 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                    Please Sign In
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    To access our beautiful collection of gradient images,
                    please sign in to your account.
                    <span className="block mt-2 text-[#CFFFE2] font-medium">
                      Join thousands of designers and developers already using
                      our library!
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <SignInButton mode="modal">
                      <button className="px-8 py-3 bg-gradient-to-r from-[#A2D5C6] via-[#CFFFE2] to-[#F6F6F6] text-black font-bold rounded-xl shadow-lg shadow-[#A2D5C6]/30 hover:shadow-[#A2D5C6]/50 transition-all duration-300 hover:-translate-y-1">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-8 py-3 border-2 border-[#F6F6F6]/30 bg-[#F6F6F6]/5 backdrop-blur-sm text-[#F6F6F6] font-bold rounded-xl hover:border-[#F6F6F6]/50 hover:bg-[#F6F6F6]/10 transition-all duration-300 hover:-translate-y-1">
                        Create Account
                      </button>
                    </SignUpButton>
                  </div>
                  <div className="mt-8 p-4 bg-gradient-to-r from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-xl">
                    <div className="flex items-center justify-center gap-8 text-gray-300 text-sm">
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#CFFFE2]">
                          500+
                        </div>
                        <div>Gradients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#CFFFE2]">
                          Free
                        </div>
                        <div>Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#CFFFE2]">
                          HD
                        </div>
                        <div>Quality</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Show no gradients found when user is authenticated but no gradients match search
                <div>
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No gradients found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? `No results for "${searchTerm}"`
                      : "No gradients available"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#A2D5C6] to-[#CFFFE2] text-black font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 space-y-0">
            {filteredGradients.map((gradient) => {
              const id = getGradientId(gradient);
              return (
                <div key={id} className="break-inside-avoid mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 w-full">
                  <GradientCard
                    gradient={{
                      ...gradient,
                      name: gradient.name || gradient.public_id || 'Untitled',
                      imageUrl: gradient.imageUrl || gradient.url || '',
                      _id: gradient._id,
                      public_id: gradient.public_id,
                    }}
                    onDownload={handleDownload}
                    onOpenModal={openModal}
                    isUserLoggedIn={!!user}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredGradients.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Showing {filteredGradients.length} of {gradients.length} gradients
            </p>
          </div>
        )}
      </div>

      {/* Modal for selected gradient */}
      <GradientModal
        gradient={
          selectedGradient &&
          (selectedGradient._id || selectedGradient.public_id)
            ? selectedGradient
            : null
        }
        onClose={closeModal}
        onDownload={handleDownload}
        isUserLoggedIn={!!user}
      />
    </div>
  );
}
