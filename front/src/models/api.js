import ImageCaptioner from "./ImageCaptioner"

export default async function generateCaption(imgSrc) {
    ImageCaptioner.getCaptioner();

    return ImageCaptioner.generateCaption(imgSrc)
}