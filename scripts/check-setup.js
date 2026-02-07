#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Valentine\'s Day setup...\n');

const checks = {
  passed: [],
  warnings: [],
  errors: []
};

// Check for .env.local
if (fs.existsSync('.env.local')) {
  checks.passed.push('✓ .env.local file exists');
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (envContent.includes('VDAY_FINAL_ANSWER')) {
    checks.passed.push('✓ VDAY_FINAL_ANSWER is set');
  } else {
    checks.warnings.push('⚠ VDAY_FINAL_ANSWER not found in .env.local');
  }
} else {
  checks.warnings.push('⚠ .env.local file not found (using defaults)');
}

// Check for assets
const assetDir = path.join('public', 'vday');
if (fs.existsSync(assetDir)) {
  checks.passed.push('✓ public/vday directory exists');
  
  // Check for video
  const videoPath = path.join(assetDir, 'intro.mp4');
  if (fs.existsSync(videoPath)) {
    checks.passed.push('✓ intro.mp4 found');
  } else {
    checks.warnings.push('⚠ intro.mp4 not found - video scene will fail');
  }
  
  // Check for song
  const songPath = path.join(assetDir, 'song.mp3');
  if (fs.existsSync(songPath)) {
    checks.passed.push('✓ song.mp3 found');
  } else {
    checks.warnings.push('⚠ song.mp3 not found - lyric scene will fail');
  }
  
  // Check for photos directory
  const photosDir = path.join(assetDir, 'photos');
  if (fs.existsSync(photosDir)) {
    const photos = fs.readdirSync(photosDir).filter(f => 
      f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
    );
    if (photos.length > 0) {
      checks.passed.push(`✓ ${photos.length} photos found in photos directory`);
    } else {
      checks.warnings.push('⚠ No photos found in photos directory');
    }
  } else {
    checks.warnings.push('⚠ photos directory not found');
  }
} else {
  checks.errors.push('✗ public/vday directory not found');
}

// Check data files
const dataFiles = [
  'data/vday/lyrics.json',
  'data/vday/poems.json',
  'data/vday/notes.json',
  'data/vday/clues.json',
  'data/vday/photos.ts'
];

dataFiles.forEach(file => {
  if (fs.existsSync(file)) {
    checks.passed.push(`✓ ${file} exists`);
  } else {
    checks.errors.push(`✗ ${file} not found`);
  }
});

// Print results
console.log('PASSED:');
checks.passed.forEach(msg => console.log('  ' + msg));

if (checks.warnings.length > 0) {
  console.log('\nWARNINGS:');
  checks.warnings.forEach(msg => console.log('  ' + msg));
}

if (checks.errors.length > 0) {
  console.log('\nERRORS:');
  checks.errors.forEach(msg => console.log('  ' + msg));
}

console.log('\n' + '='.repeat(50));
if (checks.errors.length === 0 && checks.warnings.length === 0) {
  console.log('✨ Setup looks great! Ready to run.');
  console.log('\nRun: npm run dev');
  console.log('Visit: http://localhost:3000/vday');
} else if (checks.errors.length === 0) {
  console.log('⚠ Setup has warnings but should still work.');
  console.log('\nYou can run it with: npm run dev');
  console.log('Some features may not work without the assets.');
} else {
  console.log('❌ Setup has errors. Please fix them first.');
  console.log('\nRefer to SETUP_GUIDE.md for instructions.');
}
console.log('='.repeat(50) + '\n');
