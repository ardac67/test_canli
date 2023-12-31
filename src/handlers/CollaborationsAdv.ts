import prisma from '../db'
export const getCollaborationAdvertiser = async (req, res) => {
  try {
    const proposal = await prisma.collaboration.findMany({
      where: {
        user_id: req.params.id
      },
      include: {
        belongToCampaign:{
          include:{
            user:true
          }
        },
        belongToUser: true,
      }
    })
    res.json({ proposal })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export default getCollaborationAdvertiser
