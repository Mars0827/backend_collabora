namespace Collabora_Backend.Controllers
{
    using Collabora_Backend.Services;
    using Google.Cloud.Firestore;
    using Microsoft.AspNetCore.Mvc;
    [ApiController]
    [Route("api/[controller]")]
    public class FirestoreController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public FirestoreController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddDocument([FromBody] MyDocumentModel document)
        {
            try
            {
                // Ensure document is not null
                if (document == null)
                {
                    return BadRequest("Document is null");
                }

                // Add the document to Firestore
                var collection = _firestoreDb.Collection("YourCollectionName");
                await collection.AddAsync(document);  // Firestore automatically serializes the object

                return Ok("Document added successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }

    [FirestoreData]
    public class MyDocumentModel
    {
        [FirestoreProperty]
        public string Id { get; set; }

        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public int Age { get; set; }
    }
}
