// Signup API'sini test etmek için basit bir script
async function testSignup() {
  try {
    const response = await fetch('http://localhost:3010/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: 'Test Company',
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Signup başarılı! Company ve User oluşturuldu.');
      console.log('User ID:', data.id);
      console.log('Email:', data.email);
      console.log('Company ID:', data.companyId);
    } else {
      console.log('❌ Signup başarısız:', data.error);
    }
  } catch (error) {
    console.error('❌ Test sırasında hata oluştu:', error);
  }
}

testSignup();
