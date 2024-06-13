import { getServiceSupabase } from '../../../utils/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const supabase = getServiceSupabase();
    const { user_uuid } = req.body;

    const { data, error } = await supabase
      .from('job_post')
      .select(
        '*, job_post_validity (*), application (*, resume (*)), job_post_send_que (*, channel (*), payment_session (*)), company_profile (*)'
      )
      .eq('user_uuid', user_uuid)
      .order('id', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error, message: error.message });
    }

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid data format' });
  }
}
