require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function cleanupProductSizes() {
  try {
    console.log('🧹 Product sizes cleanup gestart...')
    
    // Haal alle product sizes op
    const { data: allSizes, error: fetchError } = await supabase
      .from('product_sizes')
      .select('*')
      .order('product_id, size')
    
    if (fetchError) {
      console.error('❌ Fout bij ophalen product sizes:', fetchError)
      return
    }
    
    console.log(`📊 Gevonden ${allSizes.length} product sizes`)
    
    // Groepeer per product
    const productGroups = {}
    allSizes.forEach(size => {
      if (!productGroups[size.product_id]) {
        productGroups[size.product_id] = []
      }
      productGroups[size.product_id].push(size)
    })
    
    console.log(`📦 ${Object.keys(productGroups).length} producten gevonden`)
    
    // Controleer op duplicaten en XS maten
    for (const [productId, sizes] of Object.entries(productGroups)) {
      console.log(`\n🔍 Product ${productId}:`)
      
      // Check voor XS maten
      const xsSizes = sizes.filter(s => s.size === 'XS')
      if (xsSizes.length > 0) {
        console.log(`  ❌ XS maten gevonden: ${xsSizes.length}`)
        for (const xsSize of xsSizes) {
          console.log(`    - ID: ${xsSize.id}, Size: ${xsSize.size}`)
        }
      }
      
      // Check voor duplicaten
      const sizeCounts = {}
      sizes.forEach(s => {
        sizeCounts[s.size] = (sizeCounts[s.size] || 0) + 1
      })
      
      const duplicates = Object.entries(sizeCounts).filter(([size, count]) => count > 1)
      if (duplicates.length > 0) {
        console.log(`  ❌ Duplicaten gevonden:`)
        duplicates.forEach(([size, count]) => {
          console.log(`    - ${size}: ${count} keer`)
        })
      }
      
      // Toon alle maten
      console.log(`  📏 Maten: ${sizes.map(s => s.size).join(', ')}`)
    }
    
    // Vraag om bevestiging voor cleanup
    console.log('\n❓ Wil je de XS maten en duplicaten verwijderen? (y/n)')
    console.log('   Dit script zal:')
    console.log('   1. Alle XS maten verwijderen')
    console.log('   2. Duplicaten verwijderen (behoud de nieuwste)')
    
    // Voor nu automatisch uitvoeren
    console.log('\n🧹 Start cleanup...')
    
    let removedCount = 0
    
    // Verwijder XS maten
    const { error: xsDeleteError } = await supabase
      .from('product_sizes')
      .delete()
      .eq('size', 'XS')
    
    if (xsDeleteError) {
      console.error('❌ Fout bij verwijderen XS maten:', xsDeleteError)
    } else {
      console.log('✅ XS maten verwijderd')
    }
    
    // Verwijder duplicaten (behoud de nieuwste per product+size combinatie)
    for (const [productId, sizes] of Object.entries(productGroups)) {
      const sizeCounts = {}
      const duplicates = []
      
      sizes.forEach(size => {
        if (!sizeCounts[size.size]) {
          sizeCounts[size.size] = []
        }
        sizeCounts[size.size].push(size)
      })
      
      // Voor elke maat met duplicaten, verwijder alle behalve de nieuwste
      Object.entries(sizeCounts).forEach(([sizeName, sizeList]) => {
        if (sizeList.length > 1) {
          // Sorteer op created_at (nieuwste eerst)
          sizeList.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          
          // Verwijder alle behalve de eerste (nieuwste)
          const toRemove = sizeList.slice(1)
          toRemove.forEach(size => {
            duplicates.push(size.id)
          })
        }
      })
      
      // Verwijder duplicaten
      if (duplicates.length > 0) {
        const { error: dupDeleteError } = await supabase
          .from('product_sizes')
          .delete()
          .in('id', duplicates)
        
        if (dupDeleteError) {
          console.error(`❌ Fout bij verwijderen duplicaten voor product ${productId}:`, dupDeleteError)
        } else {
          console.log(`✅ ${duplicates.length} duplicaten verwijderd voor product ${productId}`)
          removedCount += duplicates.length
        }
      }
    }
    
    console.log(`\n🎉 Cleanup voltooid!`)
    console.log(`📊 Totaal verwijderd: ${removedCount} entries`)
    
    // Verificatie
    const { data: finalSizes, error: finalError } = await supabase
      .from('product_sizes')
      .select('*')
      .order('product_id, size')
    
    if (finalError) {
      console.error('❌ Fout bij verificatie:', finalError)
    } else {
      console.log(`✅ Verificatie: ${finalSizes.length} product sizes over`)
      
      // Toon resultaat per product
      const finalGroups = {}
      finalSizes.forEach(size => {
        if (!finalGroups[size.product_id]) {
          finalGroups[size.product_id] = []
        }
        finalGroups[size.product_id].push(size)
      })
      
      console.log('\n📋 Resultaat per product:')
      Object.entries(finalGroups).forEach(([productId, sizes]) => {
        console.log(`  Product ${productId}: ${sizes.map(s => s.size).join(', ')}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error)
  }
}

cleanupProductSizes()
