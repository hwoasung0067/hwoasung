import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as qualityAuto } from "@cloudinary/url-gen/qualifiers/quality";

// Initialize Cloudinary
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    }
});

/**
 * Utility to generate optimized Cloudinary URLs
 * @param {string} publicId - Cloudinary Public ID
 * @param {number} width - Required width
 * @param {number} height - Required height
 * @returns {string} - Optimized URL
 */
export const getOptimizedImage = (publicId, width = 800, height = 1000) => {
    if (!publicId) return null;

    const myImage = cld.image(publicId);

    // Apply transformations
    myImage
        .resize(fill().width(width).height(height).gravity(autoGravity()))
        .delivery(format(auto()))
        .delivery(quality("auto:best"));

    return myImage.toURL();
};

export default cld;
