const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const auth = require('../../middleware/auth');
const { check,validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc  Get current users profile
//@access PRIVATE
router.get('/me', auth, async (req, res) => {
 try {
   
    const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

    if(!profile) {
        res.status(400).json({msg:'There is no profile for this user'});
    }

    res.json(profile);

 }
 catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');

 }

 });


//@route POST api/profile
//@desc  Create or update a user profile
//@access PRIVATE
router.post(
    '/',
    [
      auth,
      [
        check('status', 'Status is required')
          .not()
          .isEmpty(),
        check('skills', 'Skills is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;
  
      // Build profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
      }
  
      // Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);


//@route POST api/profile/users/:user_id
//@desc  
//@access PUBLIC
router.get('/users/:user_id',async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

        if(!profile){
          res.status(400).json({msg:'No Profile found'});
        }
        res.json(profile);
    } catch (error) {
        if(err.kind == 'ObjectId'){
          return res.status(400).json({msg:'No Profile found'});
        }
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//@route DELETE api/profile
//@desc  Delete profile,users and posts
//@access PRIVATE

router.delete('/',auth, async(req,res) => {
  try {

    //Remove Profile
    await Profile.findOneAndRemove({user:req.user.id});
    //Remove users
    await User.findOneAndRemove({user:req.user.id});

    res.json({msg:'User Deleted'});
  } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
  }

});

router.put('/experience' , 
  [
    auth,
      [
        check('title','Title is Required')
          .not()
          .isEmpty(),
        check('company','Company is Required')
          .not()
          .isEmpty(),
        check('from','From date is required')
          .not()
          .isEmpty()    
          
      ]
  ], async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({errors:errors.array()});
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({user:req.user.id});

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
    }
  }
);

router.delete('/experience/:exp_id',auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({user:req.user.id});

    //Get remove index
    const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
    
    profile.experience.splice(removeIndex,1);
    
    await profile.save();

    res.json(profile);
  } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.put('/education' , 
  [
    auth,
      [
        check('school','School is Required')
          .not()
          .isEmpty(),
        check('degree','Degree is Required')
          .not()
          .isEmpty(),
        check('fieldofstudy','Field Of Study is required')
          .not()
          .isEmpty(),
        check('from','Date is Required')
          .not()
          .isEmpty()      
      ]
  ], async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({errors:errors.array()});
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({user:req.user.id});

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
    }
  }
);

router.delete('/education/:edu_id',auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({user:req.user.id});

    //Get remove index
    const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
    
    profile.education.splice(removeIndex,1);
    
    await profile.save();

    res.json(profile);
  } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});


//@route GET api/profile/github/:username
//@desc  Get user repos from Github
//@access PUBLIC
router.get('/github/:username', async(req,res) => {
  try {
    const options = {
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
      method:'GET',
      headers:{'user-agent':'node.js'}
    };

    request(options,(error,response,body) => {
      if(error) console.error(error);

      if(response.statusCode!=200){
        res.status(404).json({msg:'No github profile found'});
      }

      res.json(JSON.parse(body));

    });
  } catch(err) {
    console.error(err.message);
    res.status(404).send('Server error');
  }
})
module.exports = router;