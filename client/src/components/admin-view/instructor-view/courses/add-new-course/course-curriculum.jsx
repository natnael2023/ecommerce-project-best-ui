import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "@/services";
import { Upload } from "lucide-react";
import { useContext, useRef } from "react";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const bulkUploadInputRef = useRef(null);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      console.log(response, "bulk");
      if (response?.success && Array.isArray(response.data)) {
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          ...response.data.map((item, index) => ({
            videoUrl: item?.url ?? "",
            public_id: item?.public_id ?? "",
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
          })),
        ];

        setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

    if (response?.success) {
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  return (
    <Card className="shadow-lg rounded-lg">
  <CardHeader className="flex flex-col md:flex-row justify-between text-[#2F4F4F] p-4">
    <CardTitle className="text-lg md:text-xl font-bold">
      Create Course Curriculum
    </CardTitle>
    <div>
      <Input
        type="file"
        ref={bulkUploadInputRef}
        accept="video/*"
        multiple
        className="hidden"
        id="bulk-media-upload"
        onChange={handleMediaBulkUpload}
      />
      <Button
        as="label"
        htmlFor="bulk-media-upload"
        variant="outline"
        className="cursor-pointer bg-blue-900 text-white transition duration-300 hover:bg-blue-800"
        onClick={handleOpenBulkUploadDialog}
      >
        <Upload className="w-4 h-5 mr-2" />
        Bulk Upload
      </Button>
    </div>
  </CardHeader>
  <CardContent className="p-2">
    <Button
      disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
      onClick={handleNewLecture}
      className="mb-4 bg-blue-600 text-white transition duration-300 hover:bg-blue-500"
    >
      Add Lecture
    </Button>
    {mediaUploadProgress && (
      <MediaProgressbar
        isMediaUploading={mediaUploadProgress}
        progress={mediaUploadProgressPercentage}
      />
    )}
    <div className="mt-4 space-y-4">
      {courseCurriculumFormData.map((curriculumItem, index) => (
        <div key={`lecture-${index}`} className="border p-4 rounded-md shadow-md transition duration-300 hover:shadow-lg">
          <div className="flex gap-5 flex-col md:flex-row items-center">
            <h3 className="font-semibold">Lecture {index + 1}</h3>
            <Input
              name={`title-${index + 1}`}
              placeholder="Enter lecture title"
              className="max-w-xs md:max-w-md"
              onChange={(event) => handleCourseTitleChange(event, index)}
              value={courseCurriculumFormData[index]?.title}
            />
            <div className="flex items-center space-x-2">
              <Switch
                onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                checked={courseCurriculumFormData[index]?.freePreview}
                id={`freePreview-${index + 1}`}
              />
              <Label htmlFor={`freePreview-${index + 1}`} className="text-sm">
                Free Preview
              </Label>
            </div>
          </div>
          <div className="mt-6">
            {courseCurriculumFormData[index]?.videoUrl ? (
              <div className="flex gap-3 flex-col md:flex-row items-end md:items-center">
                <VideoPlayer
                  url={courseCurriculumFormData[index]?.videoUrl}
                  width="450px"
                  height="200px"
                />
                <div className="flex gap-2 md:flex-col">
                  <Button
                    onClick={() => handleReplaceVideo(index)}
                    className="bg-blue-600 text-white transition duration-300 hover:bg-blue-500"
                  >
                    Replace Video
                  </Button>
                  <Button
                    onClick={() => handleDeleteLecture(index)}
                    className="bg-red-600 text-white transition duration-300 hover:bg-red-500"
                  >
                    Delete Lecture
                  </Button>
                </div>
              </div>
            ) : (
              <Input
                type="file"
                accept="video/*"
                onChange={(event) => handleSingleLectureUpload(event, index)}
                className="mb-4"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
  );
}

export default CourseCurriculum;
