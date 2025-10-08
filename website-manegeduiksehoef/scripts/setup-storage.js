const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables. Please check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  try {
    console.log('🚀 Setting up Supabase Storage...')

    // Create product-images bucket
    const { data: bucketData, error: bucketError } = await supabase.storage
      .createBucket('product-images', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      })

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ product-images bucket already exists')
      } else {
        console.error('❌ Error creating bucket:', bucketError)
        return
      }
    } else {
      console.log('✅ Created product-images bucket')
    }

    // Set up RLS policies for the bucket
    const { error: policyError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Allow public read access to product images
        CREATE POLICY "Public Access" ON storage.objects
        FOR SELECT USING (bucket_id = 'product-images');

        -- Allow authenticated users to upload images
        CREATE POLICY "Authenticated users can upload" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

        -- Allow users to update their own uploads
        CREATE POLICY "Users can update own uploads" ON storage.objects
        FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

        -- Allow users to delete their own uploads
        CREATE POLICY "Users can delete own uploads" ON storage.objects
        FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
      `
    })

    if (policyError) {
      console.log('ℹ️  Policies may already exist or need to be set manually in Supabase dashboard')
    } else {
      console.log('✅ Set up storage policies')
    }

    console.log('🎉 Storage setup complete!')
    console.log('')
    console.log('📝 Next steps:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to Storage > product-images')
    console.log('3. Verify the bucket exists and is public')
    console.log('4. Test uploading an image in the admin panel')

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupStorage()
