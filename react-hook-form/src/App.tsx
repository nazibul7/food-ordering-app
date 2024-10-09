import { z } from 'zod'
import './App.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

function App() {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Minimum 6 digit long")
  })
  type LoginType = z.infer<typeof loginSchema>
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({ resolver: zodResolver(loginSchema) })
  const onSubmit = (data:LoginType) => { 
    console.log(data); 
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 p-10'>
      <div className='flex flex-col items-start gap-3'>
        <label htmlFor="">Email</label>
        <input type='email' {...register('email')} className='border px-2 py-3 outline-none' />
        {errors.email && <small className='flex-none text-red-500 text-xs mt-[-10px]'>{errors.email.message}</small>}
      </div>
      <div className='flex flex-col items-start gap-3'>
        <label htmlFor="">Password</label>
        <input type='password' {...register('password')} className='border px-2 py-3' />
        {errors.password && <span className='flex-none text-red-500 text-xs mt-[-10px]'>{errors.password.message}</span>}
      </div>
      <button>Submit</button>
    </form>
  )
}

export default App
