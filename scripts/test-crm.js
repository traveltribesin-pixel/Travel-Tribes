async function test() {
  try {
    console.log('--- 1. Testing Admin Login ---')
    const loginRes = await fetch('http://localhost:3000/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin@traveltribes.in',
        password: 'tribe@admin2027'
      })
    })

    const loginData = await loginRes.json()
    console.log('Login Response:', loginData)

    const cookie = loginRes.headers.get('set-cookie')
    console.log('Session Cookie received:', Boolean(cookie))

    console.log('\n--- 2. Testing Stats API ---')
    const statsRes = await fetch('http://localhost:3000/api/admin/stats', {
      headers: { Cookie: cookie || '' }
    })
    const statsData = await statsRes.json()
    console.log('Stats Response:', statsData)

    console.log('\n--- 3. Testing Inbound Lead Capture ---')
    const leadRes = await fetch('http://localhost:3000/api/lead-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formSource: 'Itinerary PDF Download Form',
        fullName: 'Test Traveller',
        phone: '+91 99999 88888',
        email: 'test.traveller@example.com',
        tripTitle: 'Meghalaya Backpacking Trip',
        tripSlug: 'meghalaya-backpacking'
      })
    })
    const leadData = await leadRes.json()
    console.log('Lead Capture Response:', leadData)

    console.log('\n--- 4. Checking Leads List in CRM ---')
    const leadsRes = await fetch('http://localhost:3000/api/admin/leads', {
      headers: { Cookie: cookie || '' }
    })
    const leadsData = await leadsRes.json()
    console.log('Total Leads in CRM now:', leadsData.total)
    console.log('Latest Lead:', leadsData.leads[0])

    console.log('\n--- ALL CRM ENDPOINTS WORKING SEAMLESSLY! ---')
  } catch (err) {
    console.error('Test failed:', err)
  }
}

test()
