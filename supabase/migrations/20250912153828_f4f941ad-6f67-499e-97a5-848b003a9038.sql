-- Drop existing policies to recreate them more securely
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;

-- Create a restrictive policy that denies SELECT access by default
CREATE POLICY "Deny SELECT by default" 
ON public.contact_submissions 
FOR SELECT 
TO public
RESTRICTIVE
USING (false);

-- Allow SELECT only for admin users
CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow INSERT for anyone (needed for the public contact form)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow UPDATE and DELETE only for admins
CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO public
USING (has_role(auth.uid(), 'admin'::app_role));