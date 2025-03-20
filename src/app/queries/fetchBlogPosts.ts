export const fetchBlogPosts = `
*[_type == "post"][0..3]{
  title,
  summary,
  slug,
  mainImage
}
`;
