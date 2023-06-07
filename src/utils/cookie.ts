export async function getCookie(name: string) {
  // @ts-ignore
  const item = await window.cookieStore.get(name)
  return item.value
}
