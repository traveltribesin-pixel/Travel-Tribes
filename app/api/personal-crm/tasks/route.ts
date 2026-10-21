import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMTasks,
  addPersonalCRMTask,
  togglePersonalCRMTask,
  deletePersonalCRMTask
} from '@/lib/personal-crm-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || undefined
    const priority = searchParams.get('priority') || undefined
    const type = searchParams.get('type') || undefined

    const tasks = getPersonalCRMTasks({ status, priority, type })
    return NextResponse.json({ success: true, tasks, total: tasks.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.title) {
      return NextResponse.json({ success: false, error: 'Task title is required' }, { status: 400 })
    }

    const task = addPersonalCRMTask({
      title: body.title,
      description: body.description,
      type: body.type || 'CALL',
      priority: body.priority || 'HIGH',
      dueDate: body.dueDate || new Date().toISOString().split('T')[0],
      leadId: body.leadId,
      leadName: body.leadName
    })

    return NextResponse.json({ success: true, task })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Task ID required' }, { status: 400 })
    }

    const task = togglePersonalCRMTask(id)
    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, task })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Task ID required' }, { status: 400 })
    }

    const success = deletePersonalCRMTask(id)
    return NextResponse.json({ success })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
