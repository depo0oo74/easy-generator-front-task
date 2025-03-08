import { Link } from 'react-router'

function NotFound() {
  return (
    <section className="error-page">
      <h1>404 - الصفحة غير موجودة</h1>
      <Link className='btn main-btn' to='/'>العودة الي الصفحة الرئيسية</Link>
    </section>
  )
}

export default NotFound