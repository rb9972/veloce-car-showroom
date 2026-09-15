import Showroom from '../showroom';
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const{slug}=await params;return <Showroom initialPath={'/'+slug.join('/')}/>}
