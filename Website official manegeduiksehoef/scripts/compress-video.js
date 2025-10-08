const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { spawn } = require('child_process');
const path = require('path');

const inputPath = path.join(__dirname, '../public/background-video.mp4');
const outputPath = path.join(__dirname, '../public/background-video-compressed.mp4');

console.log('🎬 Compressing video for production deployment...');
console.log('Input:', inputPath);
console.log('Output:', outputPath);

const ffmpegProcess = spawn(ffmpeg.path, [
  '-i', inputPath,
  '-vcodec', 'libx264',
  '-crf', '28', // Higher quality than default
  '-preset', 'fast',
  '-vf', 'scale=1280:720', // Reduce resolution
  '-movflags', '+faststart', // Optimize for web streaming
  '-y', // Overwrite output file
  outputPath
]);

ffmpegProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ffmpegProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Video compression completed successfully!');
    console.log('📁 Compressed video saved to:', outputPath);
  } else {
    console.error(`❌ Video compression failed with code ${code}`);
  }
});

ffmpegProcess.on('error', (error) => {
  console.error('❌ Error starting ffmpeg:', error);
});
