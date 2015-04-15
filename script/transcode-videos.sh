# brew install ffmpeg --with-fdk-aac --with-libvpx --with-libvorbis --with-speex

# mp4

ffmpeg -i media/originals/video/Orange_High_School_Vs_Barringer_High_School.mp4 -threads 4 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -tune film -crf 21 -s 480x270 -movflags +faststart -r 29.97 -c:a libfdk_aac -b:a 48k media/video/480x270/Orange_High_School_Vs_Barringer_High_School.mp4


ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Oakwood_Bridge_Cl.mp4 -threads 4 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -tune film -crf 21 -s 480x270 -movflags +faststart -r 29.97 -c:a libfdk_aac -b:a 48k media/video/480x270/Hidden_Treasures_of_Our_Orange_Oakwood_Bridge_Cl.mp4


ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Highway_280_with.mp4 -threads 4 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -tune film -crf 21 -s 480x270 -movflags +faststart -r 29.97 -c:a libfdk_aac -b:a 48k media/video/480x270/Hidden_Treasures_of_Our_Orange_Highway_280_with.mp4


ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Hat_City_No_Name.mp4 -threads 4 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -tune film -crf 21 -s 480x270 -movflags +faststart -r 29.97 -c:a libfdk_aac -b:a 48k media/video/480x270/Hidden_Treasures_of_Our_Orange_Hat_City_No_Name.mp4

# webm

ffmpeg -i media/originals/video/Orange_High_School_Vs_Barringer_High_School.mp4 -threads 8 -c:v libvpx -pix_fmt yuv420p -crf 10 -b:v 500k -s 480x270 -movflags +faststart -r 29.97 -c:a libvorbis -aq 5 media/video/480x270/Orange_High_School_Vs_Barringer_High_School.webm

ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Oakwood_Bridge_Cl.mp4 -threads 8 -c:v libvpx -pix_fmt yuv420p -crf 10 -b:v 500k -s 480x270 -movflags +faststart -r 29.97 -c:a libvorbis -aq 5 media/video/480x270/Hidden_Treasures_of_Our_Orange_Oakwood_Bridge_Cl.webm

ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Highway_280_with.mp4 -threads 8 -c:v libvpx -pix_fmt yuv420p -crf 10 -b:v 500k -s 480x270 -movflags +faststart -r 29.97 -c:a libvorbis -aq 5 media/video/480x270/Hidden_Treasures_of_Our_Orange_Highway_280_with.webm

ffmpeg -i media/originals/video/Hidden_Treasures_of_Our_Orange_Hat_City_No_Name.mp4 -threads 8 -c:v libvpx -pix_fmt yuv420p -crf 10 -b:v 500k -s 480x270 -movflags +faststart -r 29.97 -c:a libvorbis -aq 5 media/video/480x270/Hidden_Treasures_of_Our_Orange_Hat_City_No_Name.webm

