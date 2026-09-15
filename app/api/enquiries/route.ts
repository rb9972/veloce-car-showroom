import {env} from 'cloudflare:workers';
import {cars} from '../../data';
export async function POST(request:Request){
 try{
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Please submit from this website.'},{status:403});
 const raw=await request.text();if(raw.length>12000)return Response.json({error:'Your message is too long.'},{status:413});
 const b=JSON.parse(raw);const kinds=['test-drive','quote','contact','newsletter'];
 if(!kinds.includes(b.kind)||typeof b.email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)||b.email.length>254)return Response.json({error:'Please enter a valid email address.'},{status:400});
 if(typeof b.name!=='string'||b.name.trim().length<2||b.name.length>120)return Response.json({error:'Please enter your full name.'},{status:400});
 if(b.kind!=='newsletter'&&(typeof b.phone!=='string'||!/^\+?[\d ()-]{7,25}$/.test(b.phone)))return Response.json({error:'Please enter a valid phone number.'},{status:400});
 if(['test-drive','quote'].includes(b.kind)&&!cars.some(c=>c.id===b.vehicle))return Response.json({error:'Please choose a vehicle.'},{status:400});
 if(b.kind==='test-drive'&&(!/^\d{4}-\d{2}-\d{2}$/.test(b.date)||b.date<new Date().toISOString().slice(0,10)||!['10:00','11:30','13:00','14:30','16:00','17:30'].includes(b.time)))return Response.json({error:'Please choose a future date and an available time.'},{status:400});
 if(b.consent!==true)return Response.json({error:'Please agree to be contacted about this request.'},{status:400});
 const db=(env as unknown as {DB?: {prepare: (sql: string) => {bind: (...args: unknown[]) => {run: () => Promise<unknown>}}}}).DB; const id=crypto.randomUUID();
 if(db){
  await db.prepare('INSERT INTO enquiries (id,kind,name,email,phone,vehicle,details,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(id,b.kind,b.name.trim(),b.email.trim().toLowerCase(),b.phone||'',b.vehicle||'',JSON.stringify({date:b.date,time:b.time,location:b.location,message:String(b.message||'').slice(0,2000),variant:b.variant,color:b.color,finance:b.finance,tradeIn:b.tradeIn}),Date.now()).run();
 }
 return Response.json({id,status:'received'},{status:201});
 }catch(e){console.error('Enquiry save failed',e instanceof Error?e.message:'unknown');return Response.json({error:'We could not save your request. Your details are still here; please try again.'},{status:503});}
}
