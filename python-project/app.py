"""
VTU BIC702 - Blockchain Technology (Activity 2: Land Transfer Tracking System)
Student: Sanjai Shanmuga Prabu | USN: 1SP23IC047
Flask Web Application Entrypoint
"""

from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from blockchain import Blockchain

app = Flask(__name__)
app.secret_key = "vtu_bic702_blockchain_secret_key"

# Global in-memory blockchain instance
blockchain = Blockchain()
blockchain.load_sample_data()


@app.context_processor
def inject_metadata():
    return {
        "student_name": "Sanjai Shanmuga Prabu",
        "usn": "1SP23IC047",
        "subject": "Blockchain Technology",
        "subject_code": "BIC702",
        "activity": "Activity Based Learning – Activity 2",
        "topic": "Land Transfer Tracking System Using Genesis Block",
        "activity_no": 21
    }


@app.route("/")
def index():
    validation = blockchain.validate_chain()
    total_blocks = len(blockchain.chain)
    land_transfers = max(0, total_blocks - 1)
    genesis_status = "PRESENT" if total_blocks > 0 and blockchain.chain[0].is_genesis else "MISSING"
    chain_status = "VALID" if validation["is_valid"] else "INVALID"

    return render_template(
        "index.html",
        total_blocks=total_blocks,
        land_transfers=land_transfers,
        genesis_status=genesis_status,
        chain_status=chain_status,
        validation=validation,
        latest_blocks=blockchain.chain[-3:] if total_blocks > 0 else []
    )


@app.route("/add-transfer", methods=["GET", "POST"])
def add_transfer():
    if request.method == "POST":
        land_id = request.form.get("landId", "").strip()
        survey_number = request.form.get("surveyNumber", "").strip()
        location = request.form.get("location", "").strip()
        previous_owner = request.form.get("previousOwner", "").strip()
        new_owner = request.form.get("newOwner", "").strip()
        transfer_date = request.form.get("transferDate", "").strip()
        transfer_type = request.form.get("transferType", "").strip()

        # Validation
        if not all([land_id, survey_number, location, previous_owner, new_owner, transfer_date, transfer_type]):
            flash("All fields are required. Please check your inputs.", "danger")
            return redirect(url_for("add_transfer"))

        land_data = {
            "landId": land_id,
            "surveyNumber": survey_number,
            "location": location,
            "previousOwner": previous_owner,
            "newOwner": new_owner,
            "transferDate": transfer_date,
            "transferType": transfer_type
        }

        new_block = blockchain.add_block(land_data)
        flash(f"Land Transfer recorded successfully in Block #{new_block.index} with SHA-256 hash!", "success")
        return redirect(url_for("view_blockchain"))

    return render_template("add_transfer.html")


@app.route("/blockchain")
def view_blockchain():
    validation = blockchain.validate_chain()
    return render_template(
        "blockchain.html",
        chain=blockchain.chain,
        validation=validation
    )


@app.route("/history")
def history():
    query = request.args.get("q", "").strip()
    if query:
        blocks = blockchain.search(query)
    else:
        blocks = [b for b in blockchain.chain if not b.is_genesis]
    return render_template("history.html", blocks=blocks, query=query)


@app.route("/verify")
def verify():
    validation = blockchain.validate_chain()
    total_blocks = len(blockchain.chain)
    return render_template(
        "verify.html",
        validation=validation,
        total_blocks=total_blocks,
        chain=blockchain.chain
    )


@app.route("/genesis")
def genesis():
    genesis_block = blockchain.chain[0] if blockchain.chain else None
    return render_template("genesis.html", genesis_block=genesis_block)


@app.route("/architecture")
def architecture():
    return render_template("architecture.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/load-sample-data", methods=["POST"])
def load_samples():
    blockchain.load_sample_data()
    flash("Sample demonstration land records loaded successfully!", "info")
    return redirect(url_for("view_blockchain"))


@app.route("/tamper", methods=["POST"])
def tamper():
    block_index = int(request.form.get("blockIndex", 1))
    tampered_owner = request.form.get("newOwner", "Unauthorized Buyer")
    success = blockchain.tamper_block(block_index, "newOwner", tampered_owner)
    if success:
        flash(f"Block #{block_index} 'New Owner' maliciously changed to '{tampered_owner}'. Cryptographic hash mismatch introduced!", "warning")
    return redirect(url_for("verify"))


@app.route("/restore", methods=["POST"])
def restore():
    block_index = int(request.form.get("blockIndex", 1))
    success = blockchain.restore_block(block_index)
    if success:
        flash(f"Block #{block_index} restored to original cryptographic state.", "success")
    return redirect(url_for("verify"))


# JSON API for programmatic testing
@app.route("/api/chain")
def api_chain():
    return jsonify([b.to_dict() for b in blockchain.chain])


@app.route("/api/validate")
def api_validate():
    return jsonify(blockchain.validate_chain())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
