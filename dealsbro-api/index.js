import { Router } from 'itty-router'
import { addNewDeal, getAllDeals } from './api/deals'

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
    address
    postalCode
    longitude
    latitude
}

company {
    id,
    name,
    outlets
}
*/