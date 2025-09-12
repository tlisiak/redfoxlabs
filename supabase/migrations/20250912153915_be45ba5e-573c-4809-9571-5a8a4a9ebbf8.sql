-- Drop existing policies to recreate them more securely
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;

-- Create explicit policies that only allow what's necessary

-- 1. SELECT: Only admins can read contact submissions
CREATE POLICY "Only admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated, anon
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. INSERT: Anyone can submit contact forms (public form)
CREATE POLICY "Public contact form submissions allowed" 
ON public.contact_submissions 
FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- 3. UPDATE: Only admins can modify submissions
CREATE POLICY "Only admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. DELETE: Only admins can delete submissions  
CREATE POLICY "Only admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));