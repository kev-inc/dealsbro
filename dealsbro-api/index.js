import { Router } from 'itty-router'
import { addNewDeal, getAllDeals, getDeal, updateDeal, deleteDeal } from './api/deals'
import { getAllOrganisations, addNewOrganisations, getOrganisation, updateOrganisation, deleteOrganisation } from './api/organisations'
import { getAllOutlets, addNewOutlet, getOutlet, updateOutlet, deleteOutlet } from './api/outlets'
import { getLongLatFromPostalCode } from './api/geocode'

// Create a new router
const router = Router()

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.get("/deals", getAllDeals)
router.post("/deals", addNewDeal)
router.get("/deals/:dealId", getDeal)
router.put("/deals/:dealId", updateDeal)
router.delete("/deals/:dealId", deleteDeal)

router.get("/organisations", getAllOrganisations)
router.post("/organisations", addNewOrganisations)
router.get("/organisations/:orgId", getOrganisation)
router.put("/organisations/:orgId", updateOrganisation)
router.delete("/organisations/:orgId", deleteOrganisation)

router.get("/outlets", getAllOutlets)
router.post("/outlets", addNewOutlet)
router.get("/outlets/:outletId", getOutlet)
router.put("/outlets/:outletId", updateOutlet)
router.delete("/outlets/:outletId", deleteOutlet)

router.get("/geocode/:postalCode", getLongLatFromPostalCode)

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})

/*
deal {
    id,
    title
    description
    company
    startDatetime
    endDatetime
    outlets
}

outlet {
    id,
    name,
    company,
    address
    postalCode
    longitude
    latitude
}

company {
    id,
    name
    outlets
}
*/