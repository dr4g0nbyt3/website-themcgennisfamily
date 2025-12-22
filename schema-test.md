# Schema Markup Validation Checklist

Test each schema type with Google's Rich Results Test:
https://search.google.com/test/rich-results

## Schemas Implemented:

1. ✅ BlogPosting - All blog posts
2. ✅ Person - Caleb McGennis
3. ✅ Person - Stephanie Kay McGennis
4. ✅ Recipe - Pot Roast post
5. ✅ BreadcrumbList - Available via SEO component
6. ✅ WebSite - Homepage with search action
7. ✅ LocalBusiness - Main site
8. ✅ Organization - Main site

## Test URLs:

- Homepage: https://themcgennisfamily.com
- Blog post: https://themcgennisfamily.com/blog/entrepreneur-ai/best-churches-jefferson-city-missouri
- Recipe: https://themcgennisfamily.com/blog/alattetodomama/recipes/pot-roast
- Caleb profile: https://themcgennisfamily.com/family/caleb
- Stephanie profile: https://themcgennisfamily.com/family/stephanie

## Validation Commands:

```bash
# View schema in built site
grep -r "@type" dist/ | grep -E "(BlogPosting|Recipe|Person|BreadcrumbList|WebSite)"
```

## Implementation Details:

### Person Schema - Stephanie Kay McGennis
**Location:** `/src/components/SEO.astro` (lines 208-252)
- Added complete Person schema for Stephanie
- Includes job title, organizations, address, social links
- Links to spouse (Caleb) and children (Leonardo, Raphael)

### Recipe Schema
**Location:** `/src/pages/blog/alattetodomama/recipes/pot-roast.astro`
- Added comprehensive Recipe schema with:
  - 8 step-by-step HowToStep instructions
  - Complete ingredient list
  - Nutrition information
  - Prep/cook/total times
  - Recipe category and cuisine

### BreadcrumbList Schema
**Location:** `/src/components/SEO.astro` (lines 254-266)
- Added optional breadcrumbs prop to SEO component interface
- Conditionally renders BreadcrumbList when breadcrumbs array is provided
- Example usage in blog posts

### WebSite Schema with Search Action
**Location:** `/src/components/SEO.astro` (lines 74-103)
- Added WebSite schema with search functionality
- Enables Google sitelinks search box
- Includes publisher information and copyright details

## Usage Examples:

### Using Breadcrumbs in a Blog Post:

```astro
<SEO
  title="Best Churches Jefferson City"
  description="..."
  breadcrumbs={[
    {name: "Home", url: "https://themcgennisfamily.com"},
    {name: "Blog", url: "https://themcgennisfamily.com/blog"},
    {name: "An Entrepreneur in a World of AI", url: "https://themcgennisfamily.com/blog/entrepreneur-ai"},
    {name: "Best Churches Jefferson City", url: "https://themcgennisfamily.com/blog/entrepreneur-ai/best-churches-jefferson-city-missouri"}
  ]}
/>
```

### Using Recipe Schema (Already Implemented):

The pot-roast.astro file demonstrates:
- Recipe schema defined in frontmatter
- Passed to head via Fragment slot
- BaseLayout updated to support head slot

## Validation Steps:

1. Build the site: `npm run build`
2. Check generated HTML for schema markup
3. Use Google Rich Results Test for each URL
4. Verify all required properties are present
5. Check for warnings or errors

## Notes:

- All schema is valid JSON-LD format
- Properly escaped using `set:html={JSON.stringify()}`
- Images use absolute URLs
- Structured data follows schema.org specifications
- BreadcrumbList uses position-based ordering
- Recipe includes proper ISO 8601 duration format (PT20M, PT3H, etc.)
