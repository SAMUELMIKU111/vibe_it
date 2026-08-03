import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { error } = await supabase
      .from('listings')
      .select('id')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { status: 'unhealthy', database: 'error', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
